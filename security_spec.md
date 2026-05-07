# Security Specification - Portfolio Reviews

## Data Invariants
1. A review must belong to a valid authenticated user (`userId` == `request.auth.uid`).
2. Ratings must be integers between 1 and 5.
3. Comments must be strings under 1000 characters.
4. `createdAt` must be set to `request.time` during creation and remain immutable.
5. `userId` must remain immutable after creation.
6. Users can only delete their own reviews.

## The Dirty Dozen Payloads
1. **Identity Spoofing**: `{ rating: 5, comment: "bad", userId: "OTHER_USER_ID" }` -> DENY
2. **Resource Poisoning**: Document ID `"A".repeat(1500)` -> DENY
3. **Shadow Update**: `{ rating: 5, comment: "good", isAdmin: true }` -> DENY
4. **Invalid Rating**: `{ rating: 6, comment: "invalid" }` -> DENY
5. **Modification of Identity**: Update `{ userId: "NEW_ID" }` -> DENY
6. **Modification of Timestamp**: Update `{ createdAt: timestamp }` -> DENY
7. **Cross-User Delete**: User B tries to delete User A's review -> DENY
8. **Unauthenticated Write**: Write without `request.auth` -> DENY
9. **Spam Payload**: Comment size > 1000 characters -> DENY
10. **State Shortcut**: Updating `rating` without valid schema -> DENY
11. **Future Timestamp**: `{ createdAt: timestamp_in_2050 }` -> DENY
12. **Orphaned Write**: Creating a review for a non-existent user profile (if we had a users collection, but here we just check auth).

## Test Runner Plan
- Implement `firestore.rules` and verify against these cases.
