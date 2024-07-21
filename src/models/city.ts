export interface City {
  cityId: number;
  name: string;
  cityDescription: string;
  cityBanner: string;
  cityThumbnail: string;
  cityBannerUploadDate: string;
  cityThumbnailUploadDate: string;
  status: boolean;
}

export type CityList = City[];
