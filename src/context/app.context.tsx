import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { MenuItem } from '../interfaces/menu.interface'
import { PageCategory } from '../interfaces/page.interface'

export interface IAppContext {
	menu: MenuItem[]
	firstCategory: PageCategory
	setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: PageCategory.Courses,
})

export const AppContextProvider = ({
	firstCategory,
	menu,
	children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu)

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu)
	}

	useEffect(() => {
		// Preserve isOpened state when menu updates
		setMenuState(prevState => {
			if (prevState.length === 0) {
				return menu
			}

			// Merge new menu data with existing isOpened states
			return menu.map(newItem => {
				const existingItem = prevState.find(
					prev => prev._id.secondCategory === newItem._id.secondCategory,
				)
				return {
					...newItem,
					isOpened: existingItem?.isOpened ?? newItem.isOpened ?? false,
				}
			})
		})
	}, [menu])

	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	)
}
