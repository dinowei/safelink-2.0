export enum ActiveTab {
    URL = 'url',
    FILE = 'file',
    TEXT = 'text',
    DOCUMENT = 'document',
    PHONE = 'phone'
}

export enum RiskLevel {
    SAFE = 'low',
    WARNING = 'medium',
    DANGER = 'high'
}

export interface CheckDetail {
    name: string;
    result: boolean | null;
    details: string;
    error?: string;
}

export interface AnalysisResult {
    riskLevel: RiskLevel;
    riskScore: number;
    checks: CheckDetail[];
    verifiedItem: string;
}
