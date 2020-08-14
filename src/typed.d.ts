interface PollType {
  id: string;
  options: OptionType[];
  createdAt: string;
  endAt: string;
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