import { useContext } from "react";
import { NavigationComponent, FooterComponent } from "../../Components";
import { ThemeContext } from "../../Components/lightDarkMood/ThemeContext.jsx";

const TermsAndConditionsPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme context for dark and light mode

  return (
    <div
      className={`w-full object-cover bg-cover bg-center bg-no-repeat ${
        theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <NavigationComponent />
      <div className=" cursor-default max-w-screen-lg mx-auto ">
        <div className="flex justify-center py-9 ">
          <h4
            className={`text-4xl font-medium ${
              theme === "light" ? "text-gray-800" : "text-gray-50"
            }`}
          >
            Terms & Conditions
          </h4>
        </div>

        <div
          className={`flex justify-center pb-9 ${
            theme === "light" ? "text-gray-800" : "text-gray-50"
          }`}
        >
          <div className=" w-3/4">
            <div className="flex flex-col items-left">
              <h6 className="pb-2 font-semibold ">§ 1 Scope of Application</h6>
              <p className="text-sm pb-4 font-light">
                These General Terms and Conditions (T&C) govern the use of the
                BookLook app (hereinafter referred to as the "App") by the user
                (hereinafter referred to as the "User"). The App is offered by
                [WD-51] (hereinafter referred to as the "Provider").
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">
                § 2 Conclusion of Contract
              </h6>
              <p className="text-sm pb-4 font-light">
                By installing and using the App, a contract is concluded between
                the User and the Provider. The User agrees to these T&C upon
                first use of the App.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">
                § 3 Subject Matter of the Contract
              </h6>
              <p className="text-sm pb-4 font-light">
                The Provider provides the User with the App, which allows the
                User to borrow and donate physical books from bookshelves
                throughout the country. The locations of the books are displayed
                on a map. The User can also use their location to determine a
                route to the bookshelf. The User must register in the App with
                their data.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 4 Borrowing Books</h6>
              <p className="text-sm pb-4 font-light">
                Borrowing books is free of charge. There is no loan period. The
                User is not liable for the loss or damage of the book during the
                loan period, as the books belong to the public.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 5 Donating Books</h6>
              <p className="text-sm pb-4 font-light">
                The User can donate books to the bookshelves in the App. Donated
                books should be in good condition. The Provider reserves the
                right to collect and document data on donated books.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 6 User Data</h6>
              <p className="text-sm pb-4 font-light">
                The User undertakes to provide correct and complete information
                when registering in the App. The Provider uses the User data to
                provide the App and to contact the User. The Provider will not
                pass on User data to third parties unless the User has expressly
                consented to this. User data will be stored for 12 months after
                deletion of the User account and then completely deleted.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 7 Liability</h6>
              <p className="text-sm pb-4 font-light">
                The Provider is liable for intent and gross negligence. The
                Provider is only liable for slight negligence in the event of a
                breach of essential contractual obligations.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 8 Final Provisions</h6>
              <p className="text-sm pb-4 font-light">
                Amendments to these T&C must be made in writing. If any
                provision of these T&C is invalid, the remaining provisions
                shall remain in full force and effect. The place of jurisdiction
                is [Berlin].
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 9 Intellectual Property</h6>
              <p className="text-sm pb-4 font-light">
                1. User Content <br />
                The User grants the Provider a non-exclusive, worldwide,
                royalty-free license to use, reproduce, modify, distribute, and
                display the User's content (e.g., profile information, book
                reviews) in connection with the App and the Provider's services.
                The User retains all ownership rights to their content. The
                Provider grants the User a non-exclusive, worldwide,
                royalty-free license to use the App for personal, non-commercial
                purposes. The User is not permitted to copy, modify, distribute,
                or sell the App without the Provider's prior written consent.
                <br />
                <br />
                2. Provider Content <br />
                The Provider owns all intellectual property rights in the App,
                including but not limited to the code, design, and content of
                the App. The User is not permitted to copy, modify, distribute,
                or sell the App without the Provider's prior written consent.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 10 Indemnification</h6>
              <p className="text-sm pb-4 font-light">
                The User agrees to indemnify, defend, and hold harmless the
                Provider, its officers, directors, employees, agents, and
                affiliates from and against any and all claims, liabilities,
                damages, losses, costs, and expenses (including reasonable
                attorneys' fees) arising out of or in connection with the User's
                use of the App, the User's violation of these T&C, or the User's
                violation of any applicable law or regulation.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 11 Entire Agreement</h6>
              <p className="text-sm pb-4 font-light">
                These T&C constitute the entire agreement between the User and
                the Provider with respect to the subject matter hereof and
                supersede all prior or contemporaneous communications,
                representations, or agreements, whether oral or written.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 12 Severability</h6>
              <p className="text-sm pb-4 font-light">
                If any provision of these T&C is held to be invalid or
                unenforceable, such provision shall be struck from these T&C and
                the remaining provisions shall remain in full force and effect.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 13 Waiver</h6>
              <p className="text-sm pb-4 font-light">
                No waiver of any provision of these T&C shall be effective
                unless in writing and signed by both parties.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold ">§ 14 Notices</h6>
              <p className="text-sm pb-4 font-light">
                All notices and other communications hereunder shall be in
                writing and shall be deemed to have been duly given when
                delivered in person, upon the first business day following
                deposit in the mail, postage prepaid, certified or registered,
                return receipt requested, addressed as follows:
                <br />
                <br />
                If to the User:
                <br />
                [User Name] [User Address]
                <br />
                <br />
                If to the Provider:
                <br />
                [Provider Name] [Provider Address]
                <br />
                <br />
                or to such other address as either party may designate in
                writing from time to time.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">
                § 15 Governing Law and Jurisdiction
              </h6>
              <p className="text-sm pb-4 font-light">
                These T&C shall be governed by and construed in accordance with
                the laws of [Jurisdiction], without regard to its conflict of
                laws principles. Any dispute arising out of or in connection
                with these T&C shall be brought before the exclusive
                jurisdiction of the courts of [Jurisdiction].
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 16 Amendment</h6>
              <p className="text-sm pb-4 font-light">
                These T&C may be amended at any time by the Provider upon
                written notice to the User. Any such amendment shall be
                effective upon the date of such notice.
              </p>
            </div>
            <div className="flex flex-col items-left ">
              <h6 className="pb-2 font-semibold">§ 17 Miscellaneous</h6>
              <p className="text-sm pb-4 font-light">
                These T&C are binding upon and inure to the benefit of the
                parties hereto and their respective successors and permitted
                assigns. No assignment of these T&C shall be effective without
                the prior written consent of the Provider. These T&C may be
                amended only by a writing signed by both parties. If any
                provision of these T&C is held to be invalid or unenforceable,
                such provision shall be struck from these T&C and the remaining
                provisions shall remain in full force and effect. These T&C
                constitute the entire agreement between the parties with respect
                to the subject matter hereof and supersede all prior or
                contemporaneous communications, representations, or agreements,
                whether oral or written.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default TermsAndConditionsPage;
