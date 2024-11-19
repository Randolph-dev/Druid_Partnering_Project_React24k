import { RestResponseData } from "../../types/drupal";

const content: { [key: string]: string } = {
  Visior: "Front page",
  Client: "Front page - Client",
  Partner: "Front page - Partner",
  JobSeeker: "Front page - Job seeker",
}

// choose the appropriate frontpage based on user type return by Mautic
export const setDynamicContent = (data: RestResponseData[], userType: string) => {
  return data.filter((item) => item.title[0].value === content[userType]);
}