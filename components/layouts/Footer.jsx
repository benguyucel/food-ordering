import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import { GoLocation } from "react-icons/go";
import axios from "axios";
const Footer = () => {
  const [footer, setFooter] = useState([]);
  const getFooter = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
      setFooter(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFooter();
  }, []);

  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6 ">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">{footer.location}</span>
              </div>
              <div>
                <i className="fa fa-phone"></i>
                <span className="inline-block ml-2">
                  Call {footer.phoneNumber}
                </span>
              </div>
              <div>
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">{footer.email}</span>
              </div>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[38px]">Feane</Title>
            <p className="mt-3">{footer?.desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
              {footer.socialMedia &&
                footer.socialMedia.map((social) => (
                  <a
                    key={social._id}
                    href={social.link}
                    className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">
                  {footer.openingHours?.day}
                </span>
              </div>
              <div>
                <span className="inline-block ml-2">
                  {footer.openingHours?.hour}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          © 2022 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};

export default Footer;
