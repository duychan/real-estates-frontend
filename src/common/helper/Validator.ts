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
