import { useRecoilState } from 'recoil';
import { pollsState } from '../stores/poll';

const usePoll = () => {
  const [polls, setPolls] = useRecoilState(pollsState);

  const createPoll = (title: string, options: OptionType[], startDate: moment.Moment, endDate: moment.Moment) => {
    const poll = {
      title,
      options,
      startDate,
      endDate
    }

    setPolls([...polls, poll]);
  }

  const votePoll = (poll: PollType, option: OptionType) => {
    const newPolls = polls.map(eachPoll => {
      if(poll === eachPoll) {
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
    createPoll,
    votePoll
  }
};

export default usePoll;
