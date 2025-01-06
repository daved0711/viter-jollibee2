import { imgPath } from "@/components/helpers/functions-general";
import {
  ChartBarStacked,
  HandPlatter,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import { FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideNavigation = ({ menu }) => {
  const links = [
    {
      title: "Dashboard",
      slug: "/developer/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      title: "Advertisement",
      slug: "/developer/advertisement",
      icon: <Megaphone size={16} />,
    },
    {
      title: "Food",
      slug: "/developer/foods",
      icon: <HandPlatter size={16} />,
    },
    {
      title: "Category",
      slug: "/developer/category",
      icon: <ChartBarStacked size={16} />,
    },
    {
      title: "Settings",
      slug: "/developer/settings",
      icon: <FaCog size={16} />,
    },
  ];

  return (
    <>
      <aside className="p-4 border-r border-line">
        <img
          src={`${imgPath}/jollibee-logo.webp`}
          alt=""
          className="w-[80%] mx-auto mt-2"
        />

        <nav>
          <ul className="mt-10">
            {links.map((item, key) => (
              <li
                className={`${
                  menu === item.slug.replaceAll("/admin/", "")
                    ? "border-accent bg-accent opacity-100 text-center text-white"
                    : ""
                } p-2 mb-2 rounded-md border border-transparent opacity-70 hover:opacity-100`}
                key={key}
              >
                <NavLink
                  to={`${item.slug}`}
                  className="flex gap-2 text-base items-center"
                >
                  {item.icon} {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideNavigation;
