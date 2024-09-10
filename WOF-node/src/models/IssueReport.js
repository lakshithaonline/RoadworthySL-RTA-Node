const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'WOF', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'Examiner', required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
    resolutionNotes: { type: String }
});

const IssueReport = mongoose.model('IssueReport', issueReportSchema);

module.exports = IssueReport;
