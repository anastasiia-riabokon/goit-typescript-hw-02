type Children = {
  children: React.ReactNode;
};

type SwitchToggle = true | false;

type Photo = {
  [key: string]: any;
};

type SearchBarProps = {
  setQuery: (query: string) => void;
};

type SearchFormData = {
  query: string;
};
