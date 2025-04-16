import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
    return (
        <section className="flex flex-col items-center w-full">
            <div className="container mx-auto px-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-4xl md:text-4xl text-violet-700 uppercase">
                        Terms and Conditions
                    </h1>

                    <div className="flex items-center gap-2 py-2">
                        <h1 className="font-medium">Last Updated:</h1>
                        <span>February 13, 2025</span>
                    </div>

                    <div className="py-2">
                        Welcome to ABIC Realty! These Terms and Conditions govern your use of our website and services related to property listings of Abic Realty and Consultancy Corporation. By accessing or using our website, you agree to comply with these terms. If you do not agree, please refrain from using our services.
                    </div>

                    <hr className="my-4" />

                    <div className="space-y-4">
                        <div>
                            <h2 className="font-bold text-lg">1. Definitions</h2>
                            <ul className="list-disc list-inside">
                                <li><strong>&quot;Website&quot;</strong> refers to <Link className='text-violet-600' href={'abicrealtyph.com'}>abicrealtyph.com</Link>, operated by ABIC Realty.</li>
                                <li><strong>&quot;User&quot;</strong> refers to any person accessing the website.</li>
                                <li><strong>&quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;</strong> refers to ABIC Realty.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">2. Use of the Website</h2>
                            <ul className="list-disc list-inside">
                                <li>The website is intended for informational purposes only regarding properties listed by ABIC Realty and Consultancy Corporation.</li>
                                <li>You must be at least 18 years old to use this website.</li>
                                <li>You agree to provide accurate and lawful information when using our services.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">3. Property Listings Disclaimer</h2>
                            <ul className="list-disc list-inside">
                                <li>The property listings are provided for general information only and do not constitute a formal offer.</li>
                                <li>Prices, availability, and features of properties are subject to change without prior notice.</li>
                                <li>ABIC Realty is not responsible for any inaccuracies, typographical errors, or outdated information.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">4. Intellectual Property</h2>
                            <ul className="list-disc list-inside">
                                <li>All content on this website, including text, images, logos, and design, is owned or licensed by ABIC Realty.</li>
                                <li>Users may not copy, distribute, modify, or use our content without prior written consent.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">5. Third-Party Links</h2>
                            <p>Our website may contain links to third-party websites. We do not endorse or control these sites and are not responsible for their content or policies.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">6. Limitation of Liability</h2>
                            <ul className="list-disc list-inside">
                                <li>ABIC Realty is not liable for any losses, damages, or claims arising from the use of our website.</li>
                                <li>We do not guarantee the accuracy, completeness, or reliability of property information.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">7. Privacy Policy</h2>
                            <p>We respect your privacy and process your personal data as described in our <strong><Link className='text-violet-600' href={'/dataprivacy'}>Privacy Policy</Link></strong>.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">8. Amendments to Terms</h2>
                            <p>We reserve the right to update these Terms and Conditions at any time. Continued use of the website after changes means acceptance of the revised terms.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">9. Governing Law</h2>
                            <p>These Terms and Conditions shall be governed by the laws of the Philippines. Any disputes shall be resolved through legal proceedings in the Philippines.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">10. Contact Us</h2>
                            <p>For any inquiries regarding these Terms, please contact us at:</p>
                            <ul className="list-disc list-inside">
                                <li><strong>Email:</strong> abicrealtycorporation@gmail.com</li>
                                <li><strong>Phone:</strong> (+63) 926 553 6964</li>
                                <li><strong>Address:</strong> Unit 202, Campos Rueda, Urban Ave., Makati City, Metro Manila, PH 1233</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TermsAndConditions;
