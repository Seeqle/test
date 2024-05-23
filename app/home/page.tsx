import React from "react"
import { BuyButton } from "../buybutton/page"
import { AccountSettingsButton } from "../buybutton/userSetting"

export default async function Home() {
    return (

        <div>
            <BuyButton></BuyButton>
            <AccountSettingsButton></AccountSettingsButton>
        </div>
    )
}