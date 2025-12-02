import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Main Container
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    scrollView: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 20,
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 24,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 4,
    },
    emailText: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },

    // Summary Container
    summaryContainer: {
        paddingHorizontal: 16,
        marginTop: 12,
        marginBottom: 24,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceCard: {
        backgroundColor: "#3B82F6",
    },
    incomeCard: {
        backgroundColor: "#F0FDF4",
    },
    expenseCard: {
        backgroundColor: "#FEF2F2",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    cardLabel: {
        fontSize: 13,
        fontWeight: "500",
        color: "#6B7280",
    },
    balanceCard: {
        backgroundColor: "#3B82F6",
    },
    balanceCard: {
        backgroundColor: "#3B82F6",
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    incomeCard: {
        backgroundColor: "#F0FDF4",
    },
    incomeAmount: {
        fontSize: 20,
        fontWeight: "700",
        color: "#059669",
    },
    expenseCard: {
        backgroundColor: "#FEF2F2",
    },
    expenseAmount: {
        fontSize: 20,
        fontWeight: "700",
        color: "#DC2626",
    },

    // Summary Row
    row: {
        flexDirection: "row",
    },

    // Transactions Section
    transactionsSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
    },
    viewAllLink: {
        fontSize: 14,
        color: "#3B82F6",
        fontWeight: "600",
    },

    // Transaction Item
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    transactionInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    iconIncome: {
        backgroundColor: "#D1FAE5",
    },
    iconExpense: {
        backgroundColor: "#FEE2E2",
    },
    transactionDetails: {
        flex: 1,
    },
    transactionCategory: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    transactionAmount: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    amount: {
        fontSize: 14,
        fontWeight: "700",
        minWidth: 80,
        textAlign: "right",
    },
    incomeText: {
        color: "#10B981",
    },
    expenseText: {
        color: "#EF4444",
    },
    deleteBtn: {
        padding: 8,
    },

    // States
    loadingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        gap: 12,
    },
    loadingLabel: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "500",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        backgroundColor: "#FEF2F2",
        borderRadius: 8,
        gap: 12,
        borderWidth: 1,
        borderColor: "#FECACA",
    },
    errorText: {
        fontSize: 14,
        color: "#DC2626",
        fontWeight: "600",
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 48,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
    },

    // Action Buttons
    addTransactionLink: {
        marginHorizontal: 16,
        marginBottom: 32,
    },
    addTransactionBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B82F6",
        paddingVertical: 14,
        borderRadius: 8,
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    addTransactionText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // Auth Screen
    authContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    authTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F2937",
        marginTop: 16,
        marginBottom: 8,
    },
    authSubtitle: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 32,
        textAlign: "center",
    },
    authButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B82F6",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    authButtonSecondary: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#3B82F6",
    },
    authButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    authButtonTextSecondary: {
        color: "#3B82F6",
    },
});