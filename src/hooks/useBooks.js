import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const DEFAULT_MSG_CATEGORIES_NAME = 'Todas las Categorías';

export const useBooks = () => {
    const [categories, setCategories] = useState([]);
    const [topTenbooks, setTopTenBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoriaId, setCategoriaId] = useState(0);
    const [paramSearch, setParamSearch] = useState({});
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searching, setSearching] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Carga inicial: categorías y top 10
    useEffect(() => {
        setLoading(true);
        Promise.all([
            api.get(ENDPOINTS.CATEGORIES),
            api.get(ENDPOINTS.TOP_10_BOOKS_SELLERS),
        ])
            .then(([categoriesRes, topTenRes]) => {
                setCategories(categoriesRes.data);
                setTopTenBooks(topTenRes.data);
            })
            .catch(() => setError('No se pudo conectar con la API'))
            .finally(() => setLoading(false));
    }, []);

    // Carga todos los libros una sola vez
    useEffect(() => {
        if (books.length > 0) return;
        setLoading(true);
        api.get(ENDPOINTS.ALL_BOOKS)
            .then((res) => setBooks(res.data))
            .catch(() => setError('No se pudo conectar con la API'))
            .finally(() => setLoading(false));
    }, [books.length]);

    // Filtrado por parámetros de búsqueda
    useEffect(() => {
        setSearching(true);
        const timeout = setTimeout(() => {
            setFilteredBooks(getBookByParams());
            setSearching(false);
        }, 150);
        return () => clearTimeout(timeout);
    }, [paramSearch, books]);

    const getCurrentCategoriaName = (currentCategoryId) => {
        const id = currentCategoryId ?? categoriaId;
        return (
            categories.find((cat) => cat.id === id)?.category ||
            DEFAULT_MSG_CATEGORIES_NAME
        );
    };

    const getBooksByCategory = () => {
        const categoryName = getCurrentCategoriaName();
        if (categoryName === DEFAULT_MSG_CATEGORIES_NAME) return books;
        return books.filter((book) => book.category === categoryName);
    };

    const getBookByParams = () => {
        const { categoriaId: cId, author, title, year } = paramSearch;
        const categoryName = getCurrentCategoriaName(cId);
        let result = books;
        if (categoryName !== DEFAULT_MSG_CATEGORIES_NAME)
            result = result.filter((b) => b.category === categoryName);
        if (author?.trim())
            result = result.filter((b) =>
                b.author.toLowerCase().includes(author.toLowerCase())
            );
        if (title?.trim())
            result = result.filter((b) =>
                b.title.toLowerCase().includes(title.toLowerCase())
            );
        if (year?.trim())
            result = result.filter((b) => b.year === parseInt(year));
        return result;
    };

    const getBookById = async (id) => {
        try {
            setLoading(true);
            const url = ENDPOINTS.BOOK_BY_ID.replace('{id}', id);
            const res = await api.get(url);
            return res.data;
        } catch (err) {
            setError(err.message || 'No se pudo conectar con la API');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getMyBooks = async (userId) => {
        try {
            setLoading(true);
            const url = ENDPOINTS.MY_BOOKS.replace('{userId}', userId);
            const res = await api.get(url);
            return res.data;
        } catch (err) {
            setError(err.message || 'No se pudo conectar con la API');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        categoriaId,
        paramSearch,
        darkMode,
        changeCategoriaId: setCategoriaId,
        changeParamSearch: setParamSearch,
        toggleDarkMode: () => setDarkMode((prev) => !prev),
        loading,
        error,
        searching,
        categories,
        topTenbooks,
        books: getBooksByCategory(),
        filteredBooks,
        getCurrentCategoriaName,
        getBookById,
        getMyBooks,
    };
};