import { Rule, RuleObject } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

export const PasswordRule: Rule[] = [
    {
        required: true,
        message: "Please enter your new password"
    },
    { min: 8 },
    {
        validator: (_, value) =>
            value &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
                ? Promise.resolve()
                : Promise.reject(
                      "Password must contain at least 8 characters, 1 capital, 1 lowercase letter and 1 number"
                  )
    }
];

export const ConfirmPasswordRule: Rule[] = [
    {
        required: true,
        message: "Please repeat your new password"
    },
    { min: 8 },
    ({ getFieldValue }: { getFieldValue: (name: NamePath) => string }) => ({
        validator(_: RuleObject, value: string) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                "The two passwords that you entered does not match."
            );
        }
    })
];

export const EmailRule: Rule[] = [
    {
        required: true,
        message: "Please enter your email"
    },
    {
        type: "email",
        message: "Please enter a valid email"
    }
];
export const FirstNameRule: Rule[] = [
    {
        required: true,
        message: "Please enter your First Name"
    },
    { whitespace: true }
];
export const LastNameRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Last Name"
    },
    { whitespace: true }
];
export const IDCard: Rule[] = [
    {
        required: true,
        message: "Please enter your ID "
    }
];
export const DateOfBirthRule: Rule[] = [
    {
        required: true,
        message: "Please provide your date of birth "
    }
];
export const AddressRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Address "
    },
    { whitespace: true }
];
export const PhoneNumberRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Phone Number "
    },
    { whitespace: true }
];

export const CityRule: Rule[] = [
    {
        required: true,
        message: "Please input your city/province!"
    }
];
export const DistrictRule: Rule[] = [
    {
        required: true,
        message: "Please input your district!"
    }
];
export const WardRule: Rule[] = [
    {
        required: true,
        message: "Please input your ward!"
    }
];

export const NameEstateRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Estate Title "
    },
    { whitespace: true }
];

export const AreaEstateRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Estate Area "
    }
];

export const TypeRule: Rule[] = [
    {
        required: true,
        message: "This estate must have type of it "
    }
];

export const BathRoomRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Estate BathRoom "
    }
];

export const BedRoomRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Estate BedRoom "
    }
];
export const PriceEstateRule: Rule[] = [
    {
        required: true,
        message: "Please enter your Estate Price "
    }
];
export const AddressNumberRule: Rule[] = [
    {
        required: true,
        message: "Please input your house number and street!"
    }
];
