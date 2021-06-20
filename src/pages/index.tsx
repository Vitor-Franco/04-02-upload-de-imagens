import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const imagesAPI = async ({ pageParam = null }): Promise<any> => {
    const { data } = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', imagesAPI, {
    getNextPageParam: (lastImage, _) =>
      lastImage.after ? lastImage.after : null,
  });

  const formattedData = useMemo(() => {
    const parseInData = data?.pages
      ?.map(page => {
        return page.data.map(dataPages => ({
          ...dataPages,
        }));
      })
      .flat();

    return parseInData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {formattedData.length > 0 && <CardList cards={formattedData} />}

        {hasNextPage && (
          <Button
            isLoading={isFetchingNextPage}
            mt="8"
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
