interface PollType {
  title: string;
  options: OptionType[];
  startDate: moment.Moment;
  endDate: moment.Moment;
}

interface OptionType {
  id: string;
  title: string;
}

interface RouteType {
  path: string;
  component: React.FC;
  name: string;
}

type RangeValue<DateType> = [DateType | null, DateType | null] | null;