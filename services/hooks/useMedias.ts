import { useQuery } from "@tanstack/react-query";
import { api } from "../../pages/api/api";

export interface ITags {
  id: number;
  name: string;
};

interface IMedia {
  id: string;
  title: string | null;
  file_name: string;
  file_path: string;
  file_length: number;
  file_type: string;
  tags: ITags[] | null
};

export interface GetMediasResponse {
  mediaList: Array<IMedia>;
  totalCount: number;
}

export async function getMedias(page: Number): Promise<GetMediasResponse> {
  const { data } = await api.get(`/medias/pagination?page=${page}`);
  
  const totalCount = Number(data.meta.totalItems);

  const mediaList = data.items.map((media: IMedia) => media);

  return {
    mediaList,
    totalCount
  };
}

export function useMedias(page: number) {
  return useQuery(['medias', page], () => getMedias(page), {
    staleTime: 1000 * 60 
  })
}