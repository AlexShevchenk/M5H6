import {
    action, makeAutoObservable,
    runInAction,
} from "mobx";
import {IResource} from "../../interface/resources";
import * as resApi from "../../api/modules/resources";


class ResourceStore {
    resources: IResource[] = [];
    totalPages = 0;
    currentPage = 1;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        runInAction(this.prefetchData);
    }

    async changePage(page: number) {
        this.currentPage = page;
        await this.prefetchData();
    }

    prefetchData = async () => {
        try {
            this.isLoading = true;
            const res = await resApi.getByPage(this.currentPage)
            this.resources = res.data;
            this.totalPages = res.total_pages;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            }
        }
        this.isLoading = false;
    };
}

export default ResourceStore;