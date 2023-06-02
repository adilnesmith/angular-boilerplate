import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
    calculateTotalPages(data: any[], itemsPerPage: number): number[] {
        const totalItems = data.length;
        return Array(Math.ceil(totalItems / itemsPerPage)).fill(0).map((_, index) => index + 1);
    }

    getPageItems(data: any[], startIndex: number, endIndex: number): any[] {
        return data.slice(startIndex, endIndex);
    }

    adjustCurrentPage(currentPage: number, totalPages: number[]): number {
        if (currentPage >= 1 && currentPage <= totalPages.length) {
            return currentPage;
        } else {
            return 1;
        }
    }
}
