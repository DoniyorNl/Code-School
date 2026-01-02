import { AppContext } from '@/src/context/app.context'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ChangeEvent, KeyboardEvent, useContext, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PageItem } from '../../interfaces/menu.interface'
import Button from '../button/button'
import Input from '../input/input'
import styles from './search.module.css'
import { SearchProps } from './search.props'
const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const { menu } = useContext(AppContext)
	const [search, setSearch] = useState('')
	const [response, setResponse] = useState<PageItem[]>([])
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const searchHandler = (alias: string) => {
		router.push(`/${router.query?.type || 'courses'}/${alias}`)
		setResponse([])
		setSearch('')
		setSelectedIndex(-1)
	}
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const allPages = menu.map(c => c.pages).flat()
		const { value } = e.target
		setSearch(value)
		const response = allPages.filter(c => c.title.toLowerCase().indexOf(value.toLowerCase()) !== -1)
		setResponse(response)
		setSelectedIndex(-1)
		if (value.length == 0) {
			setResponse([])
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (response.length === 0) return

		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setSelectedIndex(prev => (prev < response.length - 1 ? prev + 1 : prev))
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
		} else if (e.key === 'Enter' && selectedIndex >= 0) {
			e.preventDefault()
			searchHandler(response[selectedIndex].alias)
		} else if (e.key === 'Escape') {
			setResponse([])
			setSelectedIndex(-1)
		}
	}

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				placeholder='Search...'
				className={styles.input}
				value={search}
				onChange={changeHandler}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				aria-label='Search'
				aria-autocomplete='list'
				aria-controls={response.length ? 'search-results' : undefined}
				aria-expanded={response.length > 0}
			/>
			<Button appearance='primary' className={styles.button} aria-label='Search button'>
				<FaSearch />
			</Button>
			{response.length ? (
				<div className={styles.searchResponse} role='listbox' id='search-results'>
					{response.map((c, idx) => (
						<div
							onClick={() => searchHandler(c.alias)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									searchHandler(c.alias)
								}
							}}
							key={c._id}
							role='option'
							aria-selected={idx === selectedIndex}
							className={cn({ [styles.selected]: idx === selectedIndex })}
							tabIndex={0}
						>
							{c.title}
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
export default Search
