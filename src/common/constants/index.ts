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
