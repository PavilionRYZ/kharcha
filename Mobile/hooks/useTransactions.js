import { useCallback, useState } from "react";
import api from "../constants/api";
import { Alert } from "react-native";

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/${userId}`);
            const data = response.json();
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/summary/${userId}`);
            const data = response.json();
            setSummary(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            await Promise.all([
                fetchTransactions(),
                fetchSummary(),
            ]);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await api.delete(`/${id}`);
            if (!response.ok) throw new Error("Failed to delete transaction");
            await loadData();
            setLoading(false);
            Alert.alert("Transaction deleted successfully");
        } catch (error) {
            setError(error);
            setLoading(false);
            Alert.alert("Failed to delete transaction");
        }
    }, [loadData]);

    return {
        transactions,
        summary,
        loading,
        error,
        loadData,
        deleteTransaction,
    }
}