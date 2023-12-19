import { useContext } from 'react';
import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ProfileDetailContext } from './profile-context';

export const Terms = () => {
  const { step, setStep } = useContext(ProfileDetailContext);

  return (
    <div
      className={classNames('relative', {
        hidden: step !== 4,
        '': step === 4,
      })}
    >
      <h1 className="mt-24 font-sans font-extrabold lg:text-5.5 text-4xl lg:leading-14 text-neutral-500">
        Terms and Conditions
      </h1>

      <Spacer className=" lg:h-14 h-8" />

      <article className="max-h-[55vh] lg:max-h-[45vh] overflow-y-scroll">
        <h5>1. INTRODUCTION</h5>
        <p>
          1.1. These are the complete Terms of Service or Agreement (hereinafter called “these Terms of Service”) which
          shall be applicable to any BezoSusu Account provided by Bezo Susu Enterprise. vely referred to as “BezoSusu
          Services”.
        </p>
        <p>
          1.2 Bezo Susu Enterprise is a “Susu” entity duly registered in the Republic of Ghana whose registered address
          is 20 Aluguntugui Street, East Legon . We provide a digital “Susu” platform for personal savings and group
          savings for the informal sector and young people which allows them to achieve their savings goals whilst
          building a savings history.
        </p>
        <p>
          1.3. These Terms of Service should be carefully read and understood by any person who chooses to save with
          BezoSusu, before they check the “Agree” box and click “Submit” on the registration page that formalizes the
          Agreement.
        </p>
        <h5 className="mt-8">2. DEFINITIONS</h5>
        <p>
          2.1. InD these Terms of Service, the following words and expressions (save where the context requires
          otherwise) shall bear the following meanings:
        </p>
        <p>2.1.1. “BezoSusu” means Bezo Susu Enterprise;</p>
        <p>
          2.1.2. “BezoSusu Account” means any BezoSusu Account opened by Bezo Susu Enterprise using KYC data collected
          at https://bezosusu.com/signup ;
        </p>
        <p>
          2.1.3. “Deposit Amount” means the total amount paid by the user from their Mobile Money wallet into their
          BezoSusu Account on a regular basis;
        </p>
        <p>2.1.4. “User” means an individual who is operating a BezoSusu Account with a valid BezoPIN;</p>
        <p>
          2.1.5 “Savings Goal” means a savings goal created by the user where they save towards a targeted amount at the
          end of a stated period;
        </p>
        <p>
          2.1.6 “Personal Information” means the KYC details required of individuals who choose to register for a
          BezoSusu Account.
        </p>
        <h5 className="mt-8">3. DETAILED DESCRIPTION OF SERVICES</h5>
        <p>
          BezoSusu, is a digital personal savings and group savings platform that allows users to create and achieve
          savings goals whilst building a savings history. BezoSusu Accounts are linked to Mobile Money Accounts of
          users which allows users to make deposits into and withdrawals out of their BezoSusu Accounts. Users must be
          18 years or older. If you are a minor (child under the age of 18 years), you may only enter into this
          Agreement and register for a BezoSusu Account with the prior written consent of one or more of your parents or
          legal guardians. All our service fees are provided on the BezoSusu website (bezosusu.com) and also quoted on
          the USSD platform as you transact. We reserve the right to amend or vary the fees charged from time to time
          and you will be notified as such. The current version of our digital savings platform, BezoSusu, allows you to
          create several savings goals at a time so that you can set money aside for different purposes such as
          Business, Emergency and School Fees. A field called ‘Other’ is provided where you can enter your preferred
          purpose if it is not in the list. Bezo Susu Enterprise does not give financial advice and does not employ
          financial advisers. If you require financial advice, it is your responsibility to appoint a financial adviser.
        </p>
        <h5 className="mt-8">4. ACCEPTANCE</h5>
        <p>
          Creating and using a BezoSusu Account signifies that you have read these Terms of Service, understood them and
          agree to be bound by them. You will be required to confirm your identity when you register for a BezoSusu
          Account. Any registration information that you provide to us must be accurate, current, relevant and complete.
          You must also update your information so that we may send notices, statements and other information to you via
          your phone number or by email. You authorise BezoSusu to verify your Identification, Physical Address and
          other relevant details against any third party database. You must ensure that you keep your BezoPIN strictly
          confidential and secure and you do not share it with any other person. You are responsible for any and all
          actions taken using your BezoSusu Account and you agree to immediately notify us of any unauthorized use as
          soon as you become aware of it and then proceed to change your Account details immediately. You agree to
          maintain a minimum operating balance of GHS 1.00 in your BezoSusu Account.
        </p>
        <h5 className="mt-8">5. DISCLOSURE OF INFORMATION</h5>
        <p>
          You hereby expressly consent and authorize BezoSusu to share your personal information with our third - party
          financial institution partner to enable them to manage your funds effectively.
        </p>
        <h5 className="mt-8">6. DEPOSITS</h5>
        <p>
          You may credit your BezoSusu personal or group savings Account by standing order (auto - debit) or debit
          instruction by using the USSD short code *920*75#. The more you deposit, the more BezoPoints you build up to
          qualify for rewards in the future. Additionally, your deposit consistency generates a BezoScore that will help
          you qualify for other financial benefits in the future.
        </p>
        <h5 className="mt-8">7. WITHDRAWALS</h5>
        <p>
          You may withdraw money from your BezoSusu Account at any time provided you have sufficient funds. The amount
          withdrawn can only be credited to the Mobile Money wallet linked to your BezoSusu Account. Please remember
          that the minimum operating balance for your BezoSusu Account is GHS 1 (One Ghana Cedis only) and so you can
          withdraw all your savings except GHS 1. If you are unsure about any details of your BezoSusu Account or
          transaction history, please contact +233205120095, our designated Customer Care Centre, for an explanation or
          other support. However, Bezo Susu Enterprise shall not be responsible for any inaccurate explanation/
          statements made or given by any Customer Care representative.
        </p>
        <h5 className="mt-8">8. RESPONSIBILITY</h5>
        <p>
          Bezo Susu Enterprise takes responsibility for all aspects of the BezoSusu platform. Any complaints regarding
          the standard and quality of the BezoSusu platform should be directed to the following email address
          support@bezomoney.com.
        </p>
        <h5 className="mt-8">9. INTEREST</h5>
        <p>
          You shall be entitled to a monthly interest payment which is dependent on your BezoSusu Account monthly
          average balance. The 9 percent Annual Interest Rate provided by our Custodian Bank is competitive.
        </p>
        <h5 className="mt-8">10. EXPORTS RESTRICTIONS</h5>
        <p>
          The BezoSusu platform is only made available to users in Ghana even if they access the BezoSusu website and
          USSD short code from locations outside of Ghana.
        </p>
        <h5 className="mt-8">11. CUSTOMER PRIVACY POLICY</h5>
        <p>
          Bezo Susu Enterprise shall take all reasonable steps to protect the personal information of users. We may
          monitor our BezoSusu platform and databases to make sure it is operating properly. However, we do not, as a
          general practice, monitor your activities on the platform. You agree that you will have no recourse against us
          if we act in terms of this clause and you waive your right to make any claim or demand or to institute any
          legal proceedings against us arising from the interception or monitoring of the BezoSusu platform in
          accordance with our legal rights and obligations. For more information about our privacy policy, please visit
          https://bezosusu.com/privacy-policy.
        </p>
        <h5 className="mt-8">12. WARRANTIES</h5>
        <p>
          Bezo Susu Enterprise makes no warranties, representations, statements or guarantees as to the accuracy,
          appropriateness, correctness, completeness or reliability of the BezoSusu platform and the KYC data collected
          therein. Bezo Susu Enterprise does not warrant that the BezoSusu platform shall be error-free or that they
          shall meet any particular criteria of performance or quality. Bezo Susu Enterprise expressly disclaims all
          implied warranties and takes reasonable measures to ensure the integrity of the BezoSusu platform. The user
          agrees that Bezo Susu Enterprise shall not be liable for any losses or damages that may arise from the user’s
          reliance on the BezoSusu platform, however these may arise. Bezo Susu Enterprise does not make any
          representation or give any guarantee that you will realise any returns, profits, or other financial benefits
          from your use of any financial products or services accessible from the BezoSusu platform.
        </p>
        <h5 className="mt-8">13. BEZOSUSU NOTIFICATION SETTINGS</h5>
        <p>
          You will always be notified of any changes or updates made to the BezoSusu platform. The following are the
          types of notifications to expect while using the platform: Savings Goal Creation Notification When a savings
          goal is successfully create Deposit Notification When a deposit is successfully done When we deduct your
          initial minimum deposit of GHS 2 from your mobile money wallet after you create your Account for the first
          time. Withdrawal Notification When a deposit is successfully done When you do not have sufficient funds to
          withdraw Notification for Feedback When we want you to rate your experience with the BezoSusu platform.
          Deposit Reminders When we send you SMS reminders to save
        </p>
        <h5 className="mt-8">14. CLOSING YOUR BEZOSUSU ACCOUNT</h5>
        <p>
          You are free to close your Account at any time if you no longer agree to these Terms of Service, our service
          charges or our updates. You may request for your BezoSusu Account to be closed provided that your Account is
          in credit or that you have no outstanding liabilities to us. The closure will not be finalized until all
          outstanding instructions have been completed. Please make the request through our Customer Service
          Representatives. We may choose to end our banking relationship with you at any time, but we will give you
          reasonable notice unless there are specific circumstances that prevent us from doing so such as suspicion that
          you have committed or attempted a fraud, impersonation, forgery, etc. Upon successful closure of your BezoSusu
          Account, we will deactivate your BezoPIN. We will remove from our records all your information in our
          possession except information and data which we are obliged by law to retain.{' '}
        </p>
        <h5 className="mt-8">15. JURISDICTION</h5>
        <p>
          These Terms of Service shall be governed by the laws of the Republic of Ghana, and the User consents to the
          jurisdiction of the Republic of Ghana Courts in the event of any dispute(s). If any of the provisions of these
          Terms of Service are found by a court of competent jurisdiction to be invalid or unenforceable, that provision
          shall be enforced to the maximum extent permissible so as to give effect to the intent of these Terms of
          Service, and the remainder of these Terms of Service shall continue in full force and effect. These Terms of
          Service constitute the entire agreement between Bezo Susu Enterprise and the User with regard to the use of
          the BezoSusu platform. You consent to the exclusive jurisdiction of the courts of the Republic of Ghana over
          any dispute(s) with Bezo Susu Enterprise concerning the BezoSusu platform or these Terms of Service.
        </p>
        <h5 className="mt-8">16. VARIATION</h5>
        <p>
          Bezo Susu Enterprise may, in its sole discretion, change this Terms of Service or any part thereof at any time
          and users will be notified of such changes. If you object to any amendment, e.g. updated fee structure, your
          sole remedy is to terminate your use of the BezoSusu platform
        </p>
        <h5 className="mt-8">17. BEZO SUSU ENTERPRISE CONTACT DETAILS</h5>
        <p>
          Website: www.bezosusu.com Email: admin@bezomoney.com Telephone: +233 20 51200 95 Physical address: No. 20
          Aluguntugui Street, East Legon, Accra.
        </p>
      </article>

      <Spacer className="h-5" />

      <div className="mt-5 pb-10 lg:w-2/5 w-full absolute right-0">
        <Button className="w-full mb-5" onClick={() => setStep(5)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
