import { useState } from 'react';
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

  return {
    polls,
    createPoll
  }
};

export default usePoll;
