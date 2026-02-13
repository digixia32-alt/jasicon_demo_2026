
import React, { useEffect } from 'react';

type LegalProps = {
  type: 'privacy' | 'terms' | 'refund';
};

const Legal: React.FC<LegalProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>This Privacy Policy applies to all of the products, services and websites offered by THE ASSOCIATION OF SURGEONS OF INDIA. Sometimes, we may post product specific privacy notices or Help Centre materials to explain our products in more detail.</p>
              <p>THE ASSOCIATION OF SURGEONS OF INDIA reserves the entire right to modify/amend/remove this privacy statement anytime and without any reason. Nothing contained herein creates or is intended to create a contract/agreement between THE ASSOCIATION OF SURGEONS OF INDIA and any user visiting the THE ASSOCIATION OF SURGEONS OF INDIA website or providing identifying information of any kind.</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>Please read these terms carefully before using the online payment facility. Using the online payment facility on this website indicates that you accept these terms. If you do not accept these terms do not use this facility.</p>
              <p>All payments are subject to the following conditions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The description of services is specific to your need, when you log in with your unique password. Normally payment is required in advance (i.e. before you commence your activity).</li>
                <li>All Fees quoted are in Indian Rupees. The THE ASSOCIATION OF SURGEONS OF INDIA reserves the right to change the fees at any time.</li>
                <li>Your payment will normally reach the THE ASSOCIATION OF SURGEONS OF INDIA account to which you are making a payment within two working days.</li>
                <li>We cannot accept liability for a payment not reaching the correct THE ASSOCIATION OF SURGEONS OF INDIA account due to you quoting an incorrect account number or incorrect personal details. Neither can we accept liability if payment is refused or declined by the credit/debit card supplier for any reason.</li>
                <li>In no event will the THE ASSOCIATION OF SURGEONS OF INDIA be liable for any damages whatsoever arising out of the use, inability to use, or the results of use of this site, any websites linked to this site, or the materials or information contained at any or all such sites, whether based on warranty, contract, tort or any other legal theory and whether or not advised of the possibility of such damages.</li>
              </ul>
            </div>
          )
        };
      case 'refund':
        return {
          title: 'Refund Policy',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>If the Customer leaves the THE ASSOCIATION OF SURGEONS OF INDIA before they complete their service period, there shall be no entitlement to a refund of paid service fees.</p>
              <p>Refunds, if applicable, at the discretion of the Management, will only be made to the debit/credit card used for the original transaction. For the avoidance of doubt nothing in this Policy shall require the THE ASSOCIATION OF SURGEONS OF INDIA to refund the Fees (or part thereof) unless such Fees (or part thereof) have previously been paid.</p>
            </div>
          )
        };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-[#121826]/80 backdrop-blur-md border border-[#1F2937] rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold serif text-[#E6EAF0] mb-8 border-b border-[#1F2937] pb-6">
          {title}
        </h1>
        <div className="prose prose-invert max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Legal;
