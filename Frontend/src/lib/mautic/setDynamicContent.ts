import { RestResponseData } from "../../types/drupal";

const content: { [key: string]: string } = {
  Visior: "Front page",
  Client: "Front page - Client",
  Partner: "Front page - Partner",
  JobSeeker: "Front page - Job seeker",
}

export const setDynamicContent = (data: RestResponseData[], userType: string) => {
  return data.filter((item) => item.title[0].value === content[userType]);
}