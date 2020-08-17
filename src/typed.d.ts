interface PollType {
  title: string;
  options: OptionType[];
  startDate: moment.Moment;
  endDate: moment.Moment;
  totalVotes?: number;
}

interface OptionType {
  id: string;
  title: string;
  votes?: number;
}

interface RouteType {
  path: string;
  component: React.FC;
  name: string;
}

type RangeValue<DateType> = [DateType | null, DateType | null] | null;