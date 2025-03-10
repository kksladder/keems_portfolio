import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioPage from './page/index.jsx'; // 경로 확인

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PortfolioPage />
    </StrictMode>
);
