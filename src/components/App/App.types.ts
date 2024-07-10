type Children = {
  children: React.ReactNode;
};

type SwitchToggle = true | false;

type Photo = {
  [key: string]: any;
};

type PhotoAPIResponse = {
  total_pages: number;
  results: Photo[];
  total: number;
};

type SearchBarProps = {
  setQuery: (query: string) => void;
};

type SearchFormData = {
  query: string;
};

type ImageGalleryProps = {
  photos: Photo[];
  onClick: (photo: Photo) => void;
};

type OnClickImage = {
  onClick: (photo: Photo) => void;
};

type LoadMoreProps = {
  onClick: () => void;
};

type ImageModalProps = {
  isOpen: SwitchToggle;
  onClose: () => void;
  photoDetails: Photo | null;
};

type Tags = {
  [key: string]: string;
};
