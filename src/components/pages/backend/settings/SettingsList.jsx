import { HandPlatter, LayoutDashboard, Megaphone } from "lucide-react";
import React from "react";
import { FaChevronCircleRight, FaChevronRight, FaDev, FaUserCog, FaUsers, FaUsersCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SettingsList = () => {
  const links = [
    {
      title: "Role",
      slug: "/admin/settings/role",
      icon: <FaUsersCog size={16} />,
    },
    {
      title: "Developer",
      slug: "/admin/settings/developer",
      icon: <FaDev size={16} />,
    },
    {
      title: "User",
      slug: "/admin/settings/user",
      icon: <FaUsers size={16} />,
    },
  ];
  return (
    <>
      <ul>
        {links.map((item, key) => {
          return (
            <li key={key} className="flex gap-2 text-base items-center">
              <NavLink
                to={item.slug}
                className={
                  "flex items-center justify-between gap-2 py-2 w-full hover:bg-gray-100/5"
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </div>
                <div>
                  <FaChevronRight />
                </div>
              </NavLink>
            </li>
          );
        })}
        <li></li>
      </ul>
    </>
  );
};

export default SettingsList;
