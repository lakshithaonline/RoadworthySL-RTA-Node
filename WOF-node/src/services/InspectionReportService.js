const PDFDocument = require('pdfkit');
const WOF = require('../models/wofInspection');

// Define constants for styles
const HEADER_COLOR = '#003366';
const TEXT_COLOR = '#000000';
const TITLE_FONT_SIZE = 16;
const SECTION_TITLE_FONT_SIZE = 14;
const CONTENT_FONT_SIZE = 10;
const FOOTER_FONT_SIZE = 8;

const addSection = (doc, title, content) => {
    doc.moveDown(1);
    doc.fontSize(SECTION_TITLE_FONT_SIZE).fillColor(HEADER_COLOR).text(title, { underline: true });
    doc.fillColor(TEXT_COLOR).moveDown(0.5);
    doc.fontSize(CONTENT_FONT_SIZE).text(content);
    doc.moveDown(0.5);
    doc.moveTo(30, doc.y).lineTo(doc.page.width - 30, doc.y).stroke();
};

const addRatingTable = (doc, ratings) => {
    doc.fontSize(CONTENT_FONT_SIZE).fillColor(HEADER_COLOR).text('Component', { continued: true });
    doc.text('Rating', { align: 'right' });
    doc.fillColor(TEXT_COLOR);
    doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke();

    Object.entries(ratings).forEach(([key, value], index) => {
        doc.fontSize(CONTENT_FONT_SIZE).text(key.charAt(0).toUpperCase() + key.slice(1), { continued: true });
        doc.text(value.toString(), { align: 'right' });
        if (index < Object.entries(ratings).length - 1) {
            doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke();
        }
    });
    doc.moveDown(1);
};

const addCriticalConcernsTable = (doc, concerns) => {
    if (concerns.length > 0) {
        doc.fontSize(CONTENT_FONT_SIZE).fillColor(HEADER_COLOR).text('Parameter', { continued: true });
        doc.text('Score', { continued: true, align: 'right' });
        doc.text('Severity', { align: 'right' });
        doc.fillColor(TEXT_COLOR);
        doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke();

        concerns.forEach((concern, index) => {
            doc.fontSize(CONTENT_FONT_SIZE).text(concern.parameter, { continued: true });
            doc.text(concern.score.toString(), { continued: true, align: 'right' });
            doc.text(concern.severity, { align: 'right' });
            if (index < concerns.length - 1) {
                doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke();
            }
        });
    } else {
        doc.fontSize(CONTENT_FONT_SIZE).text('No critical concerns found.');
    }
    doc.moveDown(1);
};

exports.generateInspectionReport = async (_id) => {
    try {
        const inspection = await WOF.findById(_id).populate('vehicle').populate('owner').exec();

        if (!inspection) throw new Error('Inspection not found');

        const doc = new PDFDocument({ margin: 30 });
        const fileName = `WOF_Report_${inspection.vehicle.registrationNumber}_${inspection.owner.username}.pdf`;

        // Header formatting
        doc.rect(0, 0, doc.page.width, 50).fill(HEADER_COLOR);
        doc.fillColor('#ffffff').fontSize(TITLE_FONT_SIZE).text('WOF Inspection Report', { align: 'center', baseline: 'middle' });
        doc.moveDown(0.5);

        // Add sections
        addSection(doc, 'Vehicle Details:', `
            Registration Number: ${inspection.vehicle.registrationNumber}
            Make: ${inspection.vehicle.make}
            Model: ${inspection.vehicle.model}
            VIN: ${inspection.vehicle.vinNumber}
        `);

        addSection(doc, 'Owner Details:', `
            Owner Name: ${inspection.owner.username}
            Owner Email: ${inspection.owner.email}
        `);

        // Inspection Ratings
        addSection(doc, 'Inspection Ratings:', '');
        addRatingTable(doc, inspection.ratings);

        // Final Score and Outcome
        addSection(doc, 'Final Results:', `
            Final Score: ${inspection.finalScore}
            Outcome: ${inspection.outcome === 1 ? 'Pass' : 'Fail'}
        `);

        // High Critical Concerns
        addSection(doc, 'High Critical Concerns:', '');
        addCriticalConcernsTable(doc, inspection.highCriticalConcerns);

        // Inspection Date and Footer
        doc.fontSize(CONTENT_FONT_SIZE).text(`Inspection Date: ${new Date(inspection.inspectionDate).toLocaleDateString()}`, { align: 'right' });

        // Footer with page numbers
        doc.on('pageAdded', () => {
            doc.fontSize(FOOTER_FONT_SIZE).text(`Page ${doc.pageNumber} | Contact: support@example.com`, { align: 'center', baseline: 'bottom' });
        });

        return { doc, fileName };
    } catch (error) {
        throw new Error(`Error generating report: ${error.message}`);
    }
};