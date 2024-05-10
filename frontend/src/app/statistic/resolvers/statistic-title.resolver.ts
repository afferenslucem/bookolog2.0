import { ResolveFn } from '@angular/router';
import { TitleNode } from '../../layout/components/title/title.component';

export const statisticTitleResolver: ResolveFn<TitleNode> = (route, state): TitleNode => {
    return {
        name: route.params['statisticParam']
    };
};
