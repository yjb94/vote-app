import { useRecoilState } from 'recoil';
import { pollsState } from '../stores/poll';
import { firebaseApp } from '../modules/firebase';
import { useState, useEffect } from 'react';
import moment from 'moment';

const usePoll = () => {
  const [polls, setPolls] = useRecoilState(pollsState);
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    const loadPoll = async () => {
      const snap = await firebaseApp.database().ref(`polls/`).once('value');
      const snapVal = snap.val();
      if(snapVal) {
        const polls = Object.keys(snapVal).map(id => {
          const poll = snapVal[id];
          poll.startDate = moment(poll.startDate);
          poll.endDate = moment(poll.endDate);
          return {
            id,
            ...poll
          }
        });
        setPolls(polls)
      }
    };
    
    loadPoll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createPoll = (
    title: string,
    options: OptionType[],
    startDate: moment.Moment,
    endDate: moment.Moment,
    ownerId: string
  ) => {
    setCreating(true);

    let poll = {
      title,
      options,
      startDate,
      endDate,
      ownerId,
      totalVotes: 0
    }

    const pollId: string = firebaseApp.database().ref().child('polls').push({
      title, options, ownerId,
      startDate: poll.startDate.toString(),
      endDate: poll.endDate.toString(),
    }).key || '';

    setPolls([...polls, {
      id: pollId,
      ...poll
    }]);

    setCreating(false);
    return pollId;
  }

  const deletePoll = (poll: PollType): Promise<any> => {
    setPolls(polls.filter(t => t.id !== poll.id));
    return firebaseApp.database().ref().child(`polls/${poll.id}`).remove()
  }

  const votePoll = (poll: PollType, option: OptionType) => {
    const votes = (option.votes || 0) + 1;
    const totalVotes = (poll.totalVotes || 0) + 1;
    let optionIdx = -1;
    const newPolls = polls.map(eachPoll => {
      if (poll === eachPoll) {
        return {
          ...eachPoll,
          totalVotes,
          options: eachPoll.options.map((eachOption, idx) => {
            if(eachOption === option) {
              optionIdx = idx;
            }
            return {
              ...eachOption,
              votes: eachOption === option ? votes : eachOption.votes
            }
          })
        }
      }
      return eachPoll;
    })
    firebaseApp.database().ref(`polls/${poll.id}`).update({ totalVotes })
    firebaseApp.database().ref(`polls/${poll.id}/options/${optionIdx}`).update({ votes })
    setPolls(newPolls)
  }

  return {
    polls,
    creating,
    createPoll,
    votePoll,
    deletePoll
  }
};

export default usePoll;
