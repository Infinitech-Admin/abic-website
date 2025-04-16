import React from 'react';

const DataPrivacyPolicy = () => {
    return (
        <section className="flex flex-col items-center w-full">
            <div className="container mx-auto px-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-4xl md:text-4xl text-violet-700 uppercase">
                        Data Privacy Policy
                    </h1>

                    <div className="flex items-center gap-2 py-2">
                        <h1 className="font-medium">Last Updated:</h1>
                        <span>February 13, 2025</span>
                    </div>

                    <div className="py-2">
                        ABIC Realty values your privacy and is committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when you use our website and services.
                    </div>

                    <hr className="my-4" />

                    <div className="space-y-4">
                        <div>
                            <h2 className="font-bold text-lg">1. Information We Collect</h2>
                            <ul className="list-disc list-inside">
                                <li>Personal information (e.g., name, email, phone number) provided through contact forms.</li>
                                <li>Property inquiries and communication details.</li>
                                <li>Technical data such as IP address, browser type, and device information.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">2. How We Use Your Information</h2>
                            <ul className="list-disc list-inside">
                                <li>To respond to inquiries and provide property-related services.</li>
                                <li>To improve our website, services, and user experience.</li>
                                <li>To comply with legal obligations and prevent fraudulent activity.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">3. Data Protection Measures</h2>
                            <ul className="list-disc list-inside">
                                <li>We implement industry-standard security measures to protect your data.</li>
                                <li>Access to personal data is restricted to authorized personnel only.</li>
                                <li>We do not sell or share your personal information with third parties without consent, except as required by law.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">4. Third-Party Services</h2>
                            <p>Our website may use third-party tools for analytics or marketing. These services have their own privacy policies, and we encourage you to review them.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">5. Your Rights</h2>
                            <ul className="list-disc list-inside">
                                <li>You have the right to access, update, or request deletion of your personal data.</li>
                                <li>You may opt out of marketing communications at any time.</li>
                                <li>To exercise your rights, please contact us using the details below.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">6. Updates to this Policy</h2>
                            <p>We may update this policy from time to time. Any changes will be posted on this page with an updated date.</p>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg">7. Contact Us</h2>
                            <p>If you have any questions or concerns regarding this Data Privacy Policy, please contact us:</p>
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

export default DataPrivacyPolicy;
