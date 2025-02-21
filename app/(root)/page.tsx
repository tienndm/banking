import HeaderBox from "@/components/HeaderBox";
import RighSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = { firstName: "Tien", lastName: "Nguyen", email: "nguyendominhtienai@gmail.com" };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || "Guest"}
                        subtext="Access and manage your account efficiently with our secure platform."
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>
                RECENT TRANSACTIONS
            </div>
            <RighSideBar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50},{currentBalance: 1126.85}]}
            />
        </section>
    )
}

export default Home