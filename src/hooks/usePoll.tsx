import { useRecoilState } from 'recoil';
import { pollsState } from '../stores/poll';
import { firebaseApp } from '../modules/firebase';
import { useState } from 'react';

const usePoll = () => {
  const [polls, setPolls] = useRecoilState(pollsState);
  const [creating, setCreating] = useState<boolean>(false);

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
      ownerId
    }

    const pollId: string = firebaseApp.database().ref().child('polls').push({
      title, options, ownerId,
      startDate: poll.startDate.toString(),
      endDate: poll.startDate.toString(),
    }).key || '';

    setPolls([...polls, {
      id: pollId,
      ...poll
    }]);

    setCreating(false);
    return pollId;
  }

  const votePoll = (poll: PollType, option: OptionType) => {
    const newPolls = polls.map(eachPoll => {
      if (poll === eachPoll) {
        return {
          ...eachPoll,
          totalVotes: (eachPoll.totalVotes || 0) + 1,
          options: eachPoll.options.map(eachOption => ({
            ...eachOption,
            votes: eachOption === option ? (eachOption.votes || 0) + 1 : eachOption.votes
          }))
        }
      }
      return eachPoll
    })
    setPolls(newPolls)
  }

  return {
    polls,
    creating,
    createPoll,
    votePoll
  }
};

export default usePoll;
