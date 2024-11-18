import { RestResponseData } from "../../types/drupal";

const content: { [key: string]: string } = {
  visior: "Front page",
  client: "Front page - Client",
  partner: "Front page - Partner",
  jobSeeker: "Front page - Job seeker",
}

export const setDynamicContent = (data: RestResponseData[], userType: string) => {
  return data.filter((item) => item.title[0].value === content[userType]);
}