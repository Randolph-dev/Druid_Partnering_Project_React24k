import axios from 'axios';

export const mauticDynamicContents = async () => {
  const currentUserID = localStorage.getItem('mtc_id');

  const currentUser = await axios.get(`${import.meta.env.VITE_MAUTIC_URL}api/contacts/${currentUserID}`, {
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_MAUTIC_API_TOKEN}`
    }
  });

  console.log(currentUser.data.contact.fields.all.segments);

  return null;
}
