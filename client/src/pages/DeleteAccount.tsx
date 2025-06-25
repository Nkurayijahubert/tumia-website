import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Trash2, Shield, Mail } from "lucide-react";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-[#F6F1ED]/50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#005B68] mb-4">Account Deletion Request</h1>
          <p className="text-xl text-gray-600 mb-2">Tumia Wallet</p>
          <p className="text-gray-600">We respect your right to control your personal data</p>
        </div>

        {/* How to Request Deletion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#005B68]">How to Request Account Deletion</CardTitle>
            <CardDescription>
              You can request the deletion of your Tumia Wallet account and associated data through any of the following methods:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-[#F6F1ED] p-6 rounded-lg">
              <h3 className="font-semibold text-[#005B68] mb-4 flex items-center">
                <span className="bg-[#005B68] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                Through the Tumia Wallet App:
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-9 text-gray-700">
                <li>Open the Tumia Wallet app on your device</li>
                <li>Navigate to Profile or Settings</li>
                <li>Select "Delete Account" option</li>
                <li>Provide a reason for deletion</li>
                <li>Confirm your request</li>
              </ol>
            </div>

            <div className="bg-[#F6F1ED] p-6 rounded-lg">
              <h3 className="font-semibold text-[#005B68] mb-4 flex items-center">
                <span className="bg-[#005B68] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                Contact Our Support Team:
              </h3>
              <div className="ml-9">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-[#005B68]" />
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:team@tumia.app" className="text-[#005B68] hover:underline">team@tumia.app</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Handling */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#005B68]">What Happens to Your Data</CardTitle>
            <CardDescription>
              When you request account deletion, here's what happens to your data:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-[#005B68] text-white">
                    <th className="text-left p-4 font-semibold">Data Type</th>
                    <th className="text-left p-4 font-semibold">Action</th>
                    <th className="text-left p-4 font-semibold">Timeline</th>
                    <th className="text-left p-4 font-semibold">Reason</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="font-medium">Personal Information</div>
                      <div className="text-sm text-gray-600">Name, phone number, email, profile data</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Permanently Deleted</span>
                    </td>
                    <td className="p-4">Within 30 days</td>
                    <td className="p-4">Privacy protection</td>
                  </tr>
                  <tr className="border-b bg-[#F6F1ED]/30">
                    <td className="p-4">
                      <div className="font-medium">Authentication Data</div>
                      <div className="text-sm text-gray-600">PIN, passwords, security settings</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Permanently Deleted</span>
                    </td>
                    <td className="p-4">Immediately</td>
                    <td className="p-4">Security</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="font-medium">Wallet Configuration</div>
                      <div className="text-sm text-gray-600">Sub-wallets, permissions, preferences</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Permanently Deleted</span>
                    </td>
                    <td className="p-4">Within 30 days</td>
                    <td className="p-4">Account closure</td>
                  </tr>
                  <tr className="border-b bg-[#F6F1ED]/30">
                    <td className="p-4">
                      <div className="font-medium">Transaction Records</div>
                      <div className="text-sm text-gray-600">Payment history, amounts, dates</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-[#F9C846] text-gray-800 px-2 py-1 rounded text-sm">Anonymized</span>
                    </td>
                    <td className="p-4">Within 30 days</td>
                    <td className="p-4">Legal compliance (7 years)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">
                      <div className="font-medium">Audit Logs</div>
                      <div className="text-sm text-gray-600">Security events, access logs</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Retained</span>
                    </td>
                    <td className="p-4">Permanently</td>
                    <td className="p-4">Security & compliance</td>
                  </tr>
                  <tr className="bg-[#F6F1ED]/30">
                    <td className="p-4">
                      <div className="font-medium">Support Communications</div>
                      <div className="text-sm text-gray-600">Emails, chat history</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Retained</span>
                    </td>
                    <td className="p-4">2 years</td>
                    <td className="p-4">Service improvement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#005B68]">Deletion Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Clock className="w-8 h-8 text-[#005B68] mx-auto mb-3" />
                <h4 className="font-semibold text-[#005B68] mb-2">Immediate</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Account deactivated</p>
                  <p>Access revoked</p>
                  <p>Sessions terminated</p>
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <AlertTriangle className="w-8 h-8 text-[#F9C846] mx-auto mb-3" />
                <h4 className="font-semibold text-[#005B68] mb-2">7 Days</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Request cancellation window</p>
                  <p>Contact support to cancel</p>
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h4 className="font-semibold text-[#005B68] mb-2">30 Days</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Complete data deletion</p>
                  <p>Personal data removed</p>
                  <p>Transactions anonymized</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#005B68]">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-[#F9C846] p-4 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-[#F9C846] mr-3 mt-0.5" />
                <div>
                  <strong className="text-gray-800">Irreversible Action:</strong>
                  <span className="text-gray-700 ml-1">
                    Once your account is deleted, personal data cannot be recovered. You will need to create a new account if you want to use Tumia Wallet again.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#F6F1ED] p-6 rounded-lg">
              <h3 className="font-semibold text-[#005B68] mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-gray-700 mb-4">If you have questions about account deletion or need assistance:</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <strong className="min-w-[100px] text-[#005B68]">Email:</strong>
                  <a href="mailto:team@tumia.app" className="text-[#005B68] hover:underline">team@tumia.app</a>
                </div>
                <div className="flex items-center">
                  <strong className="min-w-[100px] text-[#005B68]">Response Time:</strong>
                  <span className="text-gray-700">Within 24 hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Compliance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#005B68]">Legal Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Tumia Wallet is required by law to retain certain financial data for regulatory compliance:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold text-[#005B68] mr-2">Tax Purposes:</span>
                <span>7 years (transaction data anonymized)</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-[#005B68] mr-2">Anti-Money Laundering (AML):</span>
                <span>7 years (transaction data anonymized)</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-[#005B68] mr-2">Regulatory Reporting:</span>
                <span>As required by financial authorities</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-[#005B68] mr-2">Security Audits:</span>
                <span>Audit logs retained for security purposes</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              All retained data is anonymized to protect your privacy while meeting legal obligations.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="font-semibold text-[#005B68] mb-2">Tumia Wallet - Secure Digital Wallet Services</p>
          <p className="text-gray-600 mb-3">© 2024 Tumia Wallet. All rights reserved.</p>
          <div className="space-x-4 text-sm">
            <a href="/privacy-policy" className="text-[#005B68] hover:underline">Privacy Policy</a>
            <span className="text-gray-400">|</span>
            <a href="/terms-of-service" className="text-[#005B68] hover:underline">Terms of Service</a>
            <span className="text-gray-400">|</span>
            <a href="/contact" className="text-[#005B68] hover:underline">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}