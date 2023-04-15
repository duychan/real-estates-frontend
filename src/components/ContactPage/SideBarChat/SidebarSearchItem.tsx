import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../common/hooks/Debounce";

export interface IOptionSearchChatItem {
    nameEstate: string;
    nameOwner: string;
}

interface ISidebarSearch {
    optionEstateSearch: string[];
    optionOwnerSearch: string[];
    handleSearch: (valueSearch: string) => void;
}

export const SidebarSearchItem: React.FC<ISidebarSearch> = ({
    optionEstateSearch,
    optionOwnerSearch,
    handleSearch
}) => {
    const [valueSearch, setValueSearch] = useState("");
    const renderTitle = (title: string) => <span>{title}</span>;
    const debouncedValueSearch = useDebounce(valueSearch, 1000);
    useEffect(() => {
        handleSearch(debouncedValueSearch);
    }, [debouncedValueSearch]);

    const renderItem = (title: string) => ({
        value: title,
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                {title}
            </div>
        )
    });

    const optionData = [
        {
            label: renderTitle("Title of estate"),
            options: optionEstateSearch?.map(option => {
                return renderItem(option);
            })
        },
        {
            label: renderTitle("Owner of estate"),
            options: optionOwnerSearch?.map(option => renderItem(option))
        }
    ];

    return (
        <div className="sidebar-chat-search">
            <AutoComplete
                className="sidebar-chat-form-autocomplete"
                options={optionData}
                dropdownMatchSelectWidth={500}
                onSelect={value => {
                    setValueSearch(value);
                }}
                onSearch={value => {
                    setValueSearch(value);
                }}
            >
                <Input.Search
                    className="sidebar-chat-input-search"
                    size="large"
                    placeholder="Search estate..."
                    enterButton
                    value={valueSearch}
                />
            </AutoComplete>
        </div>
    );
};
