"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  CheckCircle,
  FileText,
  Upload,
  Send,
  Eye,
  ArrowRight,
  AlertTriangle,
  Users,
  TrendingUp,
  Download,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUploadZone } from "@/components/file-upload-zone"

const investorInterests = [
  {
    id: "INT-001",
    projectId: "PPP-PROJ-002",
    projectTitle: "Renewable Energy Grid Integration",
    investorName: "John Investor",
    investorEmail: "john.investor@email.com",
    expressedDate: "2024-01-20",
    status: "Interest Expressed",
    stage: "awaiting_acknowledgment",
    documents: {
      icNdaSent: false,
      icNdaReceived: false,
      projectPlanSent: false,
      businessProposalReceived: false,
      forwardedToHod: false,
      pmcGenerated: false,
      kycFilled: false,
      mouUploaded: false,
    },
  },
  {
    id: "INT-002",
    projectId: "PPP-PROJ-001",
    projectTitle: "Smart City Infrastructure Development",
    investorName: "Sarah Johnson",
    investorEmail: "sarah.johnson@email.com",
    expressedDate: "2024-01-18",
    status: "Business Proposal Received",
    stage: "business_proposal_received",
    documents: {
      icNdaSent: true,
      icNdaReceived: true,
      projectPlanSent: true,
      businessProposalReceived: true,
      forwardedToHod: false,
      pmcGenerated: false,
      kycFilled: false,
      mouUploaded: false,
    },
  },
]

const hodRequests = [
  {
    id: "REQ-001",
    projectId: "PPP-PROJ-003",
    projectTitle: "Digital Healthcare Platform",
    investorName: "Michael Corp",
    requestType: "refurbishment",
    hodComments:
      "The financial projections need to be more detailed. Please request updated cash flow analysis for years 3-5.",
    requestDate: "2024-01-25",
    status: "pending_resubmission",
  },
]

export default function PPPMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [interests, setInterests] = useState(investorInterests)

  const navigation = [
    { name: "Overview", id: "overview", icon: TrendingUp },
    { name: "Investor Interests", id: "interests", icon: Heart },
    { name: "Document Management", id: "documents", icon: FileText },
    { name: "HoD Requests", id: "hod-requests", icon: AlertTriangle },
    { name: "PMC Generation", id: "pmc", icon: Upload },
  ]

  const handleAcknowledgeInterest = (interestId: string) => {
    setInterests((prev) =>
      prev.map((interest) =>
        interest.id === interestId
          ? {
              ...interest,
              status: "IC/NDA Dispatched",
              stage: "ic_nda_sent",
              documents: { ...interest.documents, icNdaSent: true },
            }
          : interest,
      ),
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">PPP Member Dashboard</h1>
                  <p className="text-blue-100">Manage investor interests and project documentation</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">5</div>
                      <div className="text-sm text-gray-600">New Interests</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">8</div>
                      <div className="text-sm text-gray-600">Pending Documents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">12</div>
                      <div className="text-sm text-gray-600">Forwarded to HoD</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">2</div>
                      <div className="text-sm text-gray-600">Urgent Actions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Recent Interests</CardTitle>
                  <CardDescription>Latest investor interests requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interests.slice(0, 3).map((interest) => (
                      <div key={interest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{interest.projectTitle}</p>
                          <p className="text-sm text-gray-600">{interest.investorName}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              interest.status === "Interest Expressed"
                                ? "bg-yellow-100 text-yellow-800"
                                : interest.status === "Business Proposal Received"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {interest.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{interest.expressedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("interests")}
                  >
                    View All Interests
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Priority Actions</CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Heart className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">New Interest Expressed</p>
                        <p className="text-sm text-yellow-600">
                          Renewable Energy Project - Acknowledge and send IC/NDA
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Business Proposal Received</p>
                        <p className="text-sm text-blue-600">Smart City Infrastructure - Review and forward to HoD</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">HoD Refurbishment Request</p>
                        <p className="text-sm text-red-600">Digital Healthcare Platform - Update required</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "interests":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Investor Interests</h1>
                <p className="text-gray-600">Manage expressed interests and document flow</p>
              </div>
            </div>

            <div className="space-y-6">
              {interests.map((interest) => (
                <Card key={interest.id} className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{interest.projectTitle}</CardTitle>
                        <CardDescription>
                          {interest.investorName} • {interest.investorEmail}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          interest.status === "Interest Expressed"
                            ? "bg-yellow-100 text-yellow-800"
                            : interest.status === "Business Proposal Received"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {interest.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Document Flow Status */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div
                        className={`p-3 rounded-lg text-center ${interest.documents.icNdaSent ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        <div
                          className={`font-medium ${interest.documents.icNdaSent ? "text-green-800" : "text-gray-600"}`}
                        >
                          IC/NDA Sent
                        </div>
                        <div className={`text-sm ${interest.documents.icNdaSent ? "text-green-600" : "text-gray-500"}`}>
                          {interest.documents.icNdaSent ? "Complete" : "Pending"}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${interest.documents.icNdaReceived ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        <div
                          className={`font-medium ${interest.documents.icNdaReceived ? "text-green-800" : "text-gray-600"}`}
                        >
                          IC/NDA Received
                        </div>
                        <div
                          className={`text-sm ${interest.documents.icNdaReceived ? "text-green-600" : "text-gray-500"}`}
                        >
                          {interest.documents.icNdaReceived ? "Complete" : "Pending"}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${interest.documents.projectPlanSent ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        <div
                          className={`font-medium ${interest.documents.projectPlanSent ? "text-green-800" : "text-gray-600"}`}
                        >
                          Project Plan Sent
                        </div>
                        <div
                          className={`text-sm ${interest.documents.projectPlanSent ? "text-green-600" : "text-gray-500"}`}
                        >
                          {interest.documents.projectPlanSent ? "Complete" : "Pending"}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-lg text-center ${interest.documents.businessProposalReceived ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        <div
                          className={`font-medium ${interest.documents.businessProposalReceived ? "text-green-800" : "text-gray-600"}`}
                        >
                          Business Proposal
                        </div>
                        <div
                          className={`text-sm ${interest.documents.businessProposalReceived ? "text-green-600" : "text-gray-500"}`}
                        >
                          {interest.documents.businessProposalReceived ? "Received" : "Pending"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      {interest.stage === "awaiting_acknowledgment" && (
                        <Button
                          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                          onClick={() => handleAcknowledgeInterest(interest.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Acknowledge & Send IC/NDA
                        </Button>
                      )}

                      {interest.documents.icNdaSent && !interest.documents.projectPlanSent && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Send className="w-4 h-4 mr-2" />
                          Send Project Plan Template
                        </Button>
                      )}

                      {interest.documents.businessProposalReceived && !interest.documents.forwardedToHod && (
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Forward to HoD
                        </Button>
                      )}

                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>

                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
                <p className="text-gray-600">Manage IC/NDA templates, project plans, and PMC documents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Documents */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Template Documents</CardTitle>
                  <CardDescription>Standard templates to send to investors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Investment Certificate Template</p>
                        <p className="text-sm text-gray-600">Standard IC template for all projects</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">NDA Template</p>
                        <p className="text-sm text-gray-600">Non-disclosure agreement template</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Project Plan Template</p>
                        <p className="text-sm text-gray-600">Business proposal template</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Documents */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Upload PMC and other project documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadZone
                    title="Project Model Canvas (PMC)"
                    description="Upload generated PMC document"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="15MB"
                    status="optional"
                  />

                  <FileUploadZone
                    title="KYC Form"
                    description="Upload completed KYC form"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="10MB"
                    status="optional"
                  />

                  <FileUploadZone
                    title="MoU Draft"
                    description="Upload draft Memorandum of Understanding"
                    acceptedTypes=".pdf,.doc,.docx"
                    maxSize="15MB"
                    status="optional"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "hod-requests":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">HoD Requests</h1>
                <p className="text-gray-600">Handle refurbishment requests and resubmissions</p>
              </div>
            </div>

            {hodRequests.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Requests</h3>
                  <p className="text-gray-600">All proposals are currently under normal review process</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {hodRequests.map((request) => (
                  <Card key={request.id} className="shadow-lg border-0 border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-red-800">{request.projectTitle}</CardTitle>
                          <CardDescription>
                            {request.investorName} • Request Date: {request.requestDate}
                          </CardDescription>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          {request.requestType === "refurbishment" ? "Refurbishment Required" : request.requestType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">HoD Comments:</h4>
                        <p className="text-red-700">{request.hodComments}</p>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Response to Investor</label>
                        <Textarea
                          placeholder="Draft your response to the investor explaining the required changes..."
                          rows={4}
                          className="w-full"
                        />
                      </div>

                      <div className="flex space-x-3 pt-4 border-t">
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                          <Send className="w-4 h-4 mr-2" />
                          Send Refurbishment Request
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Original Proposal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )

      case "pmc":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PMC Generation</h1>
                <p className="text-gray-600">Generate and manage Project Model Canvas documents</p>
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Generate Project Model Canvas</CardTitle>
                <CardDescription>Create PMC for approved proposals before forwarding to MD/CEO</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select approved project</option>
                      <option value="PPP-PROJ-001">Smart City Infrastructure Development</option>
                      <option value="PPP-PROJ-002">Renewable Energy Grid Integration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investor</label>
                    <input
                      type="text"
                      value="John Investor"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Partners</label>
                    <Textarea placeholder="List key partners and stakeholders..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Activities</label>
                    <Textarea placeholder="Describe key project activities..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value Propositions</label>
                    <Textarea placeholder="Define value propositions..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Relationships</label>
                    <Textarea placeholder="Describe customer relationships..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Streams</label>
                    <Textarea placeholder="Identify revenue streams..." rows={3} className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost Structure</label>
                    <Textarea placeholder="Outline cost structure..." rows={3} className="w-full" />
                  </div>
                </div>

                <div className="flex space-x-3 pt-6 border-t">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Generate PMC
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout
      userRole="ppp-member"
      userName="Sarah Manager"
      navigation={navigation}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
