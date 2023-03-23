import area1 from "../../assets/images/area1.jpg";
import area2 from "../../assets/images/area2.jpg";
import area3 from "../../assets/images/area3.jpg";
import area4 from "../../assets/images/area4.jpg";
import area5 from "../../assets/images/area5.jpg";
import area6 from "../../assets/images/area6.jpg";
import area7 from "../../assets/images/area7.jpg";
import area8 from "../../assets/images/area8.jpg";

export const typeArr: string[] = [
    "Apartment",
    "House",
    "Private Room",
    "Shared Room"
];

export const sizeArr: string[] = [
    "15 m^2 or more",
    "30 m^2 or more",
    "60 m^2 or more",
    "90 m^2 or more"
];

export const sortOptions: { value: string; label: string }[] = [
    { value: "1", label: "Recommended" },
    {
        value: "2",
        label: "Newest"
    },
    {
        value: "3",
        label: "Lowest price"
    },
    {
        value: "4",
        label: "Highest price"
    }
];

export const pi = 3.14;
export const semicircle = 180;
export const earthRadius = 6371008;
export const earthCircumstance = 2 * pi * earthRadius;
export const numberOfTile = 1;

export const NavbarItems: { label: string; key: string }[] = [
    {
        label: "Rent",
        key: "/upload-estate"
    },
    {
        label: "Contact Us",
        key: "/"
    }
];
export const AreaList = [
    area1,
    area2,
    area3,
    area4,
    area5,
    area6,
    area7,
    area8
];
