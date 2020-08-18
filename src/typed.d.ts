interface PollType {
  id: string;
  title: string;
  options: OptionType[];
  startDate: moment.Moment;
  endDate: moment.Moment;
  ownerId: string; 
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
  name?: string;
}

interface UserType {
  id: string;
  email: string;
}

type RangeValue<DateType> = [DateType | null, DateType | null] | null;