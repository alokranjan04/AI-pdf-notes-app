import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PDFUploader } from '../components/pdf/PDFUploader';
import { PDFViewer } from '../components/pdf/PDFViewer';
import { AIAnalyzer } from '../components/ai/AIAnalyzer';
import { DocumentCollection } from '../components/dashboard/DocumentCollection';
import { SearchFeature } from '../components/pdf/SearchFeature';

// Mock the necessary dependencies
jest.mock('../lib/api/pdf');
jest.mock('../lib/ai/gemini');
jest.mock('../lib/db/convex');

describe('PDF Management', () => {
  describe('PDF Upload Component', () => {
    beforeEach(() => {
      // Reset mocks before each test
      jest.clearAllMocks();
    });

    it('should allow PDF file upload', async () => {
      render(<PDFUploader />);
      const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
      const uploadInput = screen.getByLabelText(/upload pdf/i);
      
      await userEvent.upload(uploadInput, file);
      
      expect(screen.getByText(/uploading/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText(/upload successful/i)).toBeInTheDocument();
      });
    });

    it('should reject non-PDF files', async () => {
      render(<PDFUploader />);
      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
      const uploadInput = screen.getByLabelText(/upload pdf/i);
      
      await userEvent.upload(uploadInput, file);
      
      expect(screen.getByText(/only pdf files are allowed/i)).toBeInTheDocument();
    });

    it('should handle upload errors gracefully', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Upload failed'));
      render(<PDFUploader />);
      const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
      const uploadInput = screen.getByLabelText(/upload pdf/i);
      
      await userEvent.upload(uploadInput, file);
      
      await waitFor(() => {
        expect(screen.getByText(/error uploading file/i)).toBeInTheDocument();
      });
    });
  });

  describe('PDF Viewer Component', () => {
    it('should render PDF preview correctly', async () => {
      const mockPdfUrl = 'http://example.com/test.pdf';
      render(<PDFViewer url={mockPdfUrl} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('pdf-viewer')).toBeInTheDocument();
      });
    });

    it('should handle zoom controls', async () => {
      render(<PDFViewer url="http://example.com/test.pdf" />);
      const zoomInButton = screen.getByLabelText(/zoom in/i);
      
      await userEvent.click(zoomInButton);
      
      expect(screen.getByTestId('pdf-viewer')).toHaveStyle({ transform: 'scale(1.1)' });
    });
  });
});

describe('AI Features', () => {
  describe('Document Analysis', () => {
    it('should generate document summary', async () => {
      const mockPdfContent = 'Sample PDF content';
      render(<AIAnalyzer content={mockPdfContent} />);
      const analyzeButton = screen.getByText(/analyze document/i);
      
      await userEvent.click(analyzeButton);
      
      await waitFor(() => {
        expect(screen.getByText(/summary/i)).toBeInTheDocument();
      });
    });

    it('should extract key points', async () => {
      const mockPdfContent = 'Sample PDF content with key points';
      render(<AIAnalyzer content={mockPdfContent} />);
      const extractButton = screen.getByText(/extract key points/i);
      
      await userEvent.click(extractButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('key-points-list')).toBeInTheDocument();
      });
    });

    it('should handle AI analysis errors', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('AI analysis failed'));
      render(<AIAnalyzer content="Sample content" />);
      const analyzeButton = screen.getByText(/analyze document/i);
      
      await userEvent.click(analyzeButton);
      
      await waitFor(() => {
        expect(screen.getByText(/error analyzing document/i)).toBeInTheDocument();
      });
    });
  });
});

describe('Collection Management', () => {
  it('should create new collection', async () => {
    render(<DocumentCollection />);
    const newCollectionButton = screen.getByText(/new collection/i);
    
    await userEvent.click(newCollectionButton);
    await userEvent.type(screen.getByLabelText(/collection name/i), 'Test Collection');
    await userEvent.click(screen.getByText(/create/i));
    
    expect(screen.getByText(/Test Collection/i)).toBeInTheDocument();
  });

  it('should move documents between collections', async () => {
    render(<DocumentCollection />);
    const moveButton = screen.getByLabelText(/move document/i);
    
    await userEvent.click(moveButton);
    await userEvent.selectOptions(screen.getByLabelText(/select collection/i), 'Target Collection');
    await userEvent.click(screen.getByText(/move/i));
    
    expect(screen.getByText(/document moved successfully/i)).toBeInTheDocument();
  });
});

describe('Search Functionality', () => {
  it('should search through PDF contents', async () => {
    render(<SearchFeature />);
    const searchInput = screen.getByPlaceholderText(/search pdfs/i);
    
    await userEvent.type(searchInput, 'test query');
    
    await waitFor(() => {
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  });

  it('should highlight search matches', async () => {
    render(<SearchFeature />);
    const searchInput = screen.getByPlaceholderText(/search pdfs/i);
    
    await userEvent.type(searchInput, 'specific term');
    
    await waitFor(() => {
      const highlights = screen.getAllByTestId('search-highlight');
      expect(highlights.length).toBeGreaterThan(0);
    });
  });
});