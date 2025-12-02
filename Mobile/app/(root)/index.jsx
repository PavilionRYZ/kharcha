import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { SignOutButton } from "../../components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import { styles } from "../../assets/styles/home.styles";
import { COLORS } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { user, isLoaded } = useUser();
  const { transactions, summary, loading, error, loadData, deleteTransaction } =
    useTransactions(user?.id);
  const [refreshing, setRefreshing] = useState(false);

  // Load data when user is authenticated
  useEffect(() => {
    if (isLoaded && user?.id) {
      loadData();
    }
  }, [isLoaded, user?.id, loadData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setRefreshing(false);
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={[styles.emptyStateTitle, { marginTop: 12 }]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary}
            />
          }
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.usernameText}>
                  {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <SignOutButton />
            </View>
          </View>

          <View style={styles.content}>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Total Balance</Text>
              <Text style={styles.balanceAmount}>
                ₹{summary?.balance?.toLocaleString("en-IN") || "0"}
              </Text>

              {/* Balance Stats */}
              <View style={styles.balanceStats}>
                <View style={[styles.balanceStatItem, styles.statDivider]}>
                  <Text style={styles.balanceStatLabel}>Income</Text>
                  <Text
                    style={[styles.balanceStatAmount, { color: COLORS.income }]}
                  >
                    ₹{summary?.income?.toLocaleString("en-IN") || "0"}
                  </Text>
                </View>
                <View style={styles.balanceStatItem}>
                  <Text style={styles.balanceStatLabel}>Expense</Text>
                  <Text
                    style={[
                      styles.balanceStatAmount,
                      { color: COLORS.expense },
                    ]}
                  >
                    ₹{summary?.expense?.toLocaleString("en-IN") || "0"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Transactions Section */}
            <View style={styles.transactionsHeaderContainer}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <Link href="/transactions">
                <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
                  View All
                </Text>
              </Link>
            </View>

            {/* Loading State */}
            {loading && (
              <View style={styles.emptyState}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={[styles.emptyStateTitle, { marginTop: 12 }]}>
                  Loading transactions...
                </Text>
              </View>
            )}

            {/* Error State */}
            {error && !loading && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="alert-circle"
                  size={48}
                  color={COLORS.expense}
                  style={styles.emptyStateIcon}
                />
                <Text style={styles.emptyStateTitle}>Failed to Load</Text>
                <Text style={styles.emptyStateText}>
                  Unable to load transactions. Please try again.
                </Text>
                <TouchableOpacity
                  style={styles.emptyStateButton}
                  onPress={handleRefresh}
                >
                  <Ionicons name="refresh" size={18} color={COLORS.white} />
                  <Text style={styles.emptyStateButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Empty State */}
            {!loading && !error && transactions.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="document-outline"
                  size={48}
                  color={COLORS.textLight}
                  style={styles.emptyStateIcon}
                />
                <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
                <Text style={styles.emptyStateText}>
                  Start managing your finances by adding your first transaction
                </Text>
                <Link href="/add-transaction" asChild>
                  <TouchableOpacity style={styles.emptyStateButton}>
                    <Ionicons name="add" size={18} color={COLORS.white} />
                    <Text style={styles.emptyStateButtonText}>
                      Add Transaction
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}

            {/* Transactions List */}
            {!loading &&
              !error &&
              transactions.length > 0 &&
              transactions.slice(0, 5).map((transaction) => (
                <View key={transaction._id} style={styles.transactionCard}>
                  <View style={styles.transactionContent}>
                    <View
                      style={[
                        styles.categoryIconContainer,
                        {
                          backgroundColor:
                            transaction.type === "income"
                              ? `${COLORS.income}20`
                              : `${COLORS.expense}20`,
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          transaction.type === "income"
                            ? "arrow-down"
                            : "arrow-up"
                        }
                        size={20}
                        color={
                          transaction.type === "income"
                            ? COLORS.income
                            : COLORS.expense
                        }
                      />
                    </View>
                    <View style={styles.transactionLeft}>
                      <Text style={styles.transactionTitle}>
                        {transaction.category}
                      </Text>
                      <Text style={styles.transactionCategory}>
                        {new Date(transaction.date).toLocaleDateString("en-IN")}
                      </Text>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text
                        style={[
                          styles.transactionAmount,
                          {
                            color:
                              transaction.type === "income"
                                ? COLORS.income
                                : COLORS.expense,
                          },
                        ]}
                      >
                        {transaction.type === "income" ? "+" : "-"}₹
                        {transaction.amount.toLocaleString("en-IN")}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteTransaction(transaction._id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={COLORS.expense}
                    />
                  </TouchableOpacity>
                </View>
              ))}

            {/* View All Transactions Button */}
            {!loading && !error && transactions.length > 5 && (
              <Link href="/transactions" asChild>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    {
                      justifyContent: "center",
                      marginTop: 16,
                      marginBottom: 20,
                    },
                  ]}
                >
                  <Text style={styles.addButtonText}>
                    View All Transactions
                  </Text>
                </TouchableOpacity>
              </Link>
            )}

            {/* Add Transaction Button */}
            {!loading && !error && (
              <Link href="/add-transaction" asChild>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    {
                      justifyContent: "center",
                      marginTop: 16,
                      marginBottom: 20,
                    },
                  ]}
                >
                  <Ionicons name="add-circle" size={20} color={COLORS.white} />
                  <Text style={styles.addButtonText}>Add Transaction</Text>
                </TouchableOpacity>
              </Link>
            )}
          </View>
        </ScrollView>
      </SignedIn>

      {/* Sign Out View */}
      <SignedOut>
        <View style={styles.loadingContainer}>
          <View style={{ alignItems: "center" }}>
            <Ionicons
              name="lock-closed"
              size={64}
              color={COLORS.primary}
              style={{ marginBottom: 20 }}
            />
            <Text
              style={[styles.sectionTitle, { fontSize: 28, marginBottom: 12 }]}
            >
              Finance Manager
            </Text>
            <Text
              style={[
                styles.emptyStateText,
                { marginBottom: 32, fontSize: 16 },
              ]}
            >
              Manage your money wisely
            </Text>

            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="log-in" size={20} color={COLORS.white} />
                <Text style={styles.addButtonText}>Sign In</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: COLORS.card,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  marginTop: 12,
                },
              ]}
            >
              <Link href="/(auth)/sign-up" asChild>
                <Text style={[styles.addButtonText, { color: COLORS.primary }]}>
                  Create Account
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </SignedOut>
    </View>
  );
}
