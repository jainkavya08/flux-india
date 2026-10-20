// src/lib/analytics.ts
type AnalyticsEventParams = Record<string, any>;

// Safe wrapper to call gtag
const safeGtag = (command: string, action: string, params?: AnalyticsEventParams) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(command, action, params);
  }
};

export const trackEvent = (eventName: string, params?: AnalyticsEventParams) => {
  safeGtag('event', eventName, params);
};

export const trackCategoryView = (categoryName: string) => {
  trackEvent('view_item_list', {
    item_list_name: categoryName,
    category_name: categoryName,
  });
};

export const trackProductView = (productId: string, productName: string, categoryName: string) => {
  trackEvent('view_item', {
    items: [
      {
        item_id: productId,
        item_name: productName,
        item_category: categoryName,
      },
    ],
  });
};

export const trackProductSelect = (productName: string, categoryName: string, listName: string) => {
  trackEvent('select_item', {
    item_list_name: listName,
    items: [
      {
        item_name: productName,
        item_category: categoryName,
      },
    ],
  });
};

export const trackCatalogDownload = (fileName: string, categoryName?: string, productName?: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileName.split('.').pop() || 'unknown',
    item_category: categoryName,
    item_name: productName || 'Category Catalog',
  });
};

export const trackBOMStart = () => {
  trackEvent('select_content', {
    content_type: 'bom_request',
    content_name: 'Share BOM',
  });
};

export const trackBOMSubmission = () => {
  trackEvent('generate_lead', {
    lead_type: 'bom_submission',
    lead_source: 'website',
    form_name: 'BOM Request',
  });
};

export const trackTrackStatusStart = () => {
  trackEvent('select_content', {
    content_type: 'track_status',
    content_name: 'Track Status',
  });
};

export const trackTrackStatusResult = (result: 'success' | 'not_found', status?: string) => {
  trackEvent('track_bom', {
    track_result: result,
    bom_status: status,
  });
};

export const trackContact = (method: 'whatsapp' | 'phone' | 'email') => {
  trackEvent('contact', {
    contact_method: method,
  });
};

export const trackProcessStage = (stageName: string) => {
  trackEvent('select_content', {
    content_type: 'process_stage',
    process_stage: stageName,
  });
};

export const trackSolutionViewMode = (mode: 'gallery' | 'list') => {
  trackEvent('view_mode_change', {
    mode,
    section: 'solutions',
  });
};

export const trackSolutionCardClick = (solutionTitle: string) => {
  trackEvent('select_content', {
    content_type: 'solution_category',
    content_name: solutionTitle,
  });
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
