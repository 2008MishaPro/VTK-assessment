import { useEffect, useState } from "react";
import { GetUserData } from "../../API/GetUserLogin";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    full_name: "",
    group_name: "",
  });
  useEffect(() => {
    const showData = async () => {
      const data = await GetUserData();
      setProfileData({
        email: data.email,
        full_name: data.full_name,
        group_name: data.group_name,
      });
      return data;
    };
    showData();
  }, []);

  console.log(profileData);

  return (
    <main>
      <section>
        <p>{profileData.email}</p>
        <p>{profileData.full_name}</p>
        <p>{profileData.group_name}</p>
      </section>
    </main>
  );
};
