import {useState, useEffect, useRef} from "react";
import {getPhotos} from "../../services/api";
import { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Notification from "../Notification/Notification";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMore from "../LoadMore/LoadMore";
import ImageModal from "../ImageModal/ImageModal";


function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [showLoadMore, setShowLoadMore] = useState<SwitchToggle>(false);
  const [isLoading, setIsLoading] = useState<SwitchToggle>(false);
  const [error, setError] = useState<SwitchToggle>(false);
  const [results, setResults] = useState<SwitchToggle>(false);
  const [isOpen, setIsOpen] = useState<SwitchToggle>(false);
  const [modalContent, setModalContent] = useState<Photo | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setResults(false);
        const {total_pages, results, total} = await getPhotos({query, page});
        setPhotos((prev) => [...prev, ...results]);
        setShowLoadMore(total_pages > 1);

        if (total == 0) {
          setResults(true);
          return;
        } else {
          setResults(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getData();
    }
  }, [query, page]);

  const handleQuery = (query: string) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const handleOpenModal = (photo:Photo) => {
    setIsOpen(true);
    setModalContent(photo);
  };

  return (
    <>
      <SearchBar setQuery={handleQuery} />
      <Section>
        <Container>
          {results && <Notification />}
          {photos.length > 0 && <ImageGallery photos={photos} onClick={handleOpenModal} />}
          {error && <ErrorMessage />}
          {isLoading && <Loader />}
          {!isLoading && showLoadMore && !error && <LoadMore onClick={handleLoadMore} />}
        </Container>
      </Section>

      {isOpen && <ImageModal isOpen={isOpen} onClose={closeModal} photoDetails={modalContent} />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
