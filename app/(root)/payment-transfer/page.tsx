import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.action';
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id});
  
  if (!accounts) return;
  
  const accountData = accounts?.data;
  return (
    <section className='payment-transfer'>
      <HeaderBox 
        title="Payment Transfer"
        subtext='Please provide any specific details or notes realated to the payment transfer'
      />

      <section className='size-full pt-5'>
        <PaymentTransferForm 
          accounts={accountData}
        />
      </section>

    </section>

  )
}

export default Transfer