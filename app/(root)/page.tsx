import HeaderBox from "@/components/HeaderBox";
import RecentTransaction from "@/components/RecentTransaction";
import RighSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccounts, getAccount } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";
import React from "react";

const Home = async (props: SearchParamProps) => {
    const { id, page } = await props.searchParams;
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn.$id});
    
    if (!accounts) return;
    
    const accountData = accounts?.data;
    const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
    
    const account = await getAccount({ appwriteItemId });
    
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
                        accounts={accountData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
                <RecentTransaction 
                    accounts={accountData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage}
                />
            </div>
            <RighSideBar
                user={loggedIn}
                transactions={[account?.transactions]}
                banks={accountData?.slice(0, 2)}
            />
        </section>
    )
}

export default Home